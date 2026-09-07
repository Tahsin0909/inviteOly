'use client'

import { useState } from 'react'
import { ChevronDown, Funnel, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface FilterOption {
    value: string
    label: string
}

export interface FilterConfig {
    label: string
    key: string
    options: FilterOption[]
}

interface FilterSortProps {
    filters: FilterConfig[]
    onFilterChange?: (filters: Record<string, string>) => void
}

export default function FilterSort({ filters, onFilterChange }: FilterSortProps) {
    const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

    const handleFilterSelect = (key: string, value: string) => {
        const newFilters = {
            ...activeFilters,
            [key]: value,
        }
        setActiveFilters(newFilters)
        onFilterChange?.(newFilters)
    }

    const removeFilter = (key: string) => {
        const newFilters = { ...activeFilters }
        delete newFilters[key]
        setActiveFilters(newFilters)
        onFilterChange?.(newFilters)
    }

    const clearAllFilters = () => {
        setActiveFilters({})
        onFilterChange?.({})
    }

    const getFilterLabel = (key: string) => {
        return filters.find((f) => f.key === key)?.label
    }

    const getOptionLabel = (key: string, value: string) => {
        const filter = filters.find((f) => f.key === key)
        return filter?.options.find((o) => o.value === value)?.label || value
    }

    const hasActiveFilters = Object.keys(activeFilters).length > 0

    return (
        <div className="w-full space-y-4 ">
            {/* Filter Header and Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Funnel size={"18px"} className='text-[#004024] dark:text-white' />
                    <span className="font-semibold text-[#004024] dark:text-white">Filter & Sort</span>
                </div>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-xs text-red-600 hover:text-red-700"
                    >
                        ✕ Clear filter
                    </Button>
                )}
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
                {filters.map((filter) => (
                    <DropdownMenu key={filter.key}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-between truncate bg-transparent"
                            >
                                <span className="truncate">
                                    {activeFilters[filter.key]
                                        ? getOptionLabel(filter.key, activeFilters[filter.key])
                                        : filter.label}
                                </span>
                                <ChevronDown className="h-4 w-4 flex-shrink-0" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48">
                            {filter.options.map((option) => (
                                <DropdownMenuItem
                                    key={option.value}
                                    onClick={() => handleFilterSelect(filter.key, option.value)}
                                >
                                    {option.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ))}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="space-y-2">
                    <span className="text-sm font-semibold text-gray-700">Active filters:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {Object.entries(activeFilters).map(([key, value]) => (
                            <div
                                key={key}
                                className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-transparent dark:border border border-transparent dark:border-gray-800 px-3 py-1 text-sm"
                            >
                                <button
                                    onClick={() => removeFilter(key)}
                                    className="hover:text-red-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                                <span>
                                    <span className="font-semibold ">{getFilterLabel(key)}:</span>{' '}
                                    <span className="text-teal-600">{getOptionLabel(key, value)}</span>
                                </span>

                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
