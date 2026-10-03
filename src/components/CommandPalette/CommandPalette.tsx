"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

import {
  ArrowRightIcon,
  BookmarkSquareIcon,
  DocumentTextIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { getPosts } from "@/services/postServices";
import { Post } from "@/types/common";

import useEscapeKey from "@/hook/useEscapeKey";
import useLockBodyScroll from "@/hook/useLockBodyScroll";

interface PaletteAction {
  id: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  href: string;
}

const staticActions: PaletteAction[] = [
  {
    id: "home",
    label: "خانه",
    icon: <HomeIcon className="h-5 w-5" />,
    href: "/",
  },
  {
    id: "blogs",
    label: "همه بلاگ ها",
    icon: <DocumentTextIcon className="h-5 w-5" />,
    href: "/blogs",
  },
  {
    id: "profile",
    label: "داشبورد",
    icon: <UserIcon className="h-5 w-5" />,
    href: "/profile",
  },
  {
    id: "bookmarks",
    label: "نشانک ها",
    icon: <BookmarkSquareIcon className="h-5 w-5" />,
    href: "/profile/posts",
  },
];

const DEBOUNCE_MS = 300;

/**
 * Global command palette opened with `Cmd/Ctrl + K`.
 *
 * Navigates between the main routes and searches posts live (debounced)
 * against `GET /post/list?search=`.
 * Keyboard driven: arrow keys move the selection, Enter navigates, Escape closes.
 * Built as a native modal <dialog> so the browser provides the ::backdrop
 * scrim, focus trap and focus restoration, reusing the app's existing hooks
 * and design tokens.
 */
export default function CommandPalette() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = useCallback(() => {
    // Close the native dialog first so the browser restores focus to the
    // element that was focused before the palette opened.
    dialogRef.current?.close();

    setIsOpen(false);
    setQuery("");
    setResults([]);
    setActiveIndex(0);
  }, []);

  // Open with Cmd/Ctrl + K anywhere in the app.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        if (isOpen) {
          close();
        } else {
          setIsOpen(true);
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  // Promote the panel to a modal dialog (adds the ::backdrop scrim and a
  // focus trap) and put the caret in the search field as soon as it opens.
  useLayoutEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    inputRef.current?.focus();
  }, [isOpen]);

  // Clicks that land on the ::backdrop are dispatched on the <dialog>
  // element itself, so listen on the document to close on outside clicks
  // without attaching listeners to the (non-interactive) dialog element.
  useEffect(() => {
    if (!isOpen) return;

    function onDocumentClick(event: MouseEvent) {
      if (event.target === dialogRef.current) {
        close();
      }
    }

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, [isOpen, close]);

  useEscapeKey(close, isOpen);
  useLockBodyScroll(isOpen);

  // Debounced live search of posts.
  useEffect(() => {
    if (!isOpen || !query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const { posts } = await getPosts(
          `search=${encodeURIComponent(query.trim())}&limit=6`,
        );

        setResults(posts);
        setActiveIndex(0);
      } catch {
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, isOpen]);

  const items: PaletteAction[] = [
    ...staticActions.filter(
      (action) => action.label.includes(query.trim()) || !query.trim(),
    ),
    ...results.map((post) => ({
      id: post._id,
      label: post.title,
      hint: post.author.name,
      icon: <DocumentTextIcon className="h-5 w-5" />,
      href: `/blogs/${post.slug}`,
    })),
  ];

  const activeItem = items[activeIndex];

  const navigate = (href: string) => {
    close();
    router.push(href);
  };

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (items.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex((index) => (index + 1) % items.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex((index) => (index - 1 + items.length) % items.length);
    } else if (event.key === "Enter" && activeItem) {
      event.preventDefault();
      navigate(activeItem.href);
    }
  }

  // Keep the highlighted row visible while arrowing through results.
  useEffect(() => {
    const active = listRef.current?.children[activeIndex] as
      HTMLElement | undefined;

    active?.scrollIntoView({
      block: "nearest",
    });
  }, [activeIndex]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    isOpen ? (
      <dialog
        ref={dialogRef}
        aria-modal="true"
        aria-label="جستجوی سریع"
        className="fixed left-1/2 top-[15vh] z-50 m-0 w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border-none bg-secondary-0 p-0 shadow-2xl backdrop:bg-secondary-800 backdrop:bg-opacity-40 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 border-b border-secondary-200 px-4">
          <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-secondary-400" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="جستجوی پست یا رفتن به صفحه..."
            className="w-full bg-transparent py-4 text-sm text-secondary-700 placeholder:text-secondary-400 focus:outline-none"
            aria-label="جستجوی پست یا صفحه"
            autoComplete="off"
          />

          <kbd className="hidden shrink-0 rounded border border-secondary-200 px-1.5 py-0.5 text-[10px] text-secondary-400 sm:block">
            Esc
          </kbd>
        </div>

        <ul ref={listRef} className="max-h-80 overflow-y-auto py-2">
          {items.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => navigate(item.href)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-right text-sm ${
                  index === activeIndex
                    ? "bg-primary-100/40 text-primary-900"
                    : "text-secondary-600"
                }`}
              >
                <span className="shrink-0 text-secondary-400">{item.icon}</span>

                <span className="truncate">{item.label}</span>

                {item.hint ? (
                  <span className="mr-auto shrink-0 text-xs text-secondary-400">
                    {item.hint}
                  </span>
                ) : null}
              </button>
            </li>
          ))}

          {items.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-secondary-400">
              {isSearching ? "در حال جستجو..." : "نتیجه ای پیدا نشد"}
            </li>
          ) : null}
        </ul>

        <div className="flex items-center justify-between border-t border-secondary-200 px-4 py-2 text-[10px] text-secondary-400">
          <span>برای حرکت از کلید های جهت دار استفاده کنید</span>

          <span className="flex items-center gap-1">
            Enter
            <ArrowRightIcon className="h-3 w-3" />
            رفتن
          </span>
        </div>
      </dialog>
    ) : null,
    document.body,
  );
}
