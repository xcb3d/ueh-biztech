'use client';

import React from 'react';

interface IconProps {
  className?: string;
}

export const BoldIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8 11h4.5a2.5 2.5 0 0 0 0-5H8v5Zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5ZM8 13v5h5.5a2.5 2.5 0 0 0 0-5H8Z" />
  </svg>
);

export const ItalicIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15v2Z" />
  </svg>
);

export const UnderlineIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2ZM4 20h16v2H4v-2Z" />
  </svg>
);

export const Heading1Icon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16Zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21Z" />
  </svg>
);

export const Heading2Icon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16Zm4-8.5V10H22v1.5h-4v1.056l.028-.015a3.5 3.5 0 0 1 1.922-.511c1.945 0 3.05 1.15 3.05 2.972 0 1.858-1.395 3-3.6 3-1.114 0-2.135-.293-2.964-.838l.695-1.354c.654.43 1.395.642 2.17.642 1.201 0 1.922-.616 1.922-1.45 0-.813-.553-1.25-1.619-1.25-.742 0-1.305.19-1.805.527L17 15.5Z" />
  </svg>
);

export const QuoteIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179Zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179Z" />
  </svg>
);

export const AlignLeftIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 4h18v2H3V4Zm0 15h14v2H3v-2Zm0-5h18v2H3v-2Zm0-5h14v2H3V9Z" />
  </svg>
);

export const AlignCenterIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 4h18v2H3V4Zm4 15h10v2H7v-2Zm-4-5h18v2H3v-2Zm4-5h10v2H7V9Z" />
  </svg>
);

export const AlignRightIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 4h18v2H3V4Zm7 15h11v2H10v-2Zm-7-5h18v2H3v-2Zm7-5h11v2H10V9Z" />
  </svg>
);

export const ListOrderedIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 4h2v2H3V4Zm4 0h14v2H7V4ZM3 10h2v2H3v-2Zm4 0h14v2H7v-2ZM3 16h2v2H3v-2Zm4 0h14v2H7v-2Z" />
  </svg>
);

export default {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  Heading1Icon,
  Heading2Icon,
  QuoteIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  ListOrderedIcon
}; 