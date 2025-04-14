'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import Logo from '../../public/logo.png'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="p-4 shadow-md bg-white rounded-md lg:mx-0 md:mx-5 mx-2">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            className="object-contain w-24 md:w-32"
            src={Logo}
            alt="Logo"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 font-medium text-sm md:text-base">
          <Link className="hover:opacity-70 transition" href="/resize">Image Resizer</Link>
          <Link className="hover:opacity-70 transition" href="/compress">Compressor</Link>
          <Link className="hover:opacity-70 transition" href="/convert">Format Converter</Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {open ? (
            <X onClick={() => setOpen(false)} className="cursor-pointer" />
          ) : (
            <Menu onClick={() => setOpen(true)} className="cursor-pointer" />
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown with Animation */}
      {open && (
        <div
          className="md:hidden mt-4 flex flex-col gap-4 font-medium text-sm bg-gray-100 p-4 rounded-md shadow-inner animate-fade-in menu-enter"
        >
          <Link onClick={() => setOpen(false)} href="/resize">Image Resizer</Link>
          <Link onClick={() => setOpen(false)} href="/compress">Compressor</Link>
          <Link onClick={() => setOpen(false)} href="/convert">Format Converter</Link>
        </div>
      )}
    </nav>
  )
}
