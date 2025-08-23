'use client'

import * as React from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Seller } from '@prisma/client'

interface SellerSelectorProps {
  sellers: Seller[]
  selectedSeller: string
  setSelectedSeller: (sellerSlug: string) => void
}

export function SellerSelector({
  sellers,
  selectedSeller,
  setSelectedSeller,
}: SellerSelectorProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedSeller
            ? sellers.find((seller) => seller.slug === selectedSeller)?.name
            : 'Select seller...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <Command>
          <CommandInput placeholder="Search seller..." className="h-9" />
          <CommandList>
            <CommandEmpty>No seller found.</CommandEmpty>
            <CommandGroup>
              {sellers.map((seller) => (
                <CommandItem
                  key={seller.id}
                  value={seller.slug}
                  onSelect={(currentValue) => {
                    setSelectedSeller(currentValue)
                    setOpen(false)
                  }}
                >
                  {seller.name}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      selectedSeller === seller.slug
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
