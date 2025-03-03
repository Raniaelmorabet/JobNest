import { Checkbox } from "../components/ui/checkbox"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"

const categories = ["Technology", "Design", "Marketing", "Sales"]
const locations = ["Remote", "New York", "Morocco", "Berlin"]
const experienceLevels = ["Entry Level", "Mid Level", "Senior"]

export function JobFilters({ filters, onFilterChange }) {
    const handleCheckboxChange = (filterType, value) => {
        onFilterChange({ ...filters, [filterType]: value })
    }

    return (
        <>
            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block space-y-8">
                <div>
                    <h3 className="font-bold mb-4">Category</h3>
                    <div className="space-y-5">
                        {categories.map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`category-${category}`}
                                    checked={filters.category === category}
                                    onCheckedChange={(checked) => handleCheckboxChange("category", checked ? category : null)}
                                />
                                <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                                    {category}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold mb-4">Location</h3>
                    <div className="space-y-5">
                        {locations.map((location) => (
                            <div key={location} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`location-${location}`}
                                    checked={filters.location === location}
                                    onCheckedChange={(checked) => handleCheckboxChange("location", checked ? location : null)}
                                />
                                <Label htmlFor={`location-${location}`} className="text-sm font-normal">
                                    {location}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold mb-4">Experience Level</h3>
                    <div className="space-y-5">
                        {experienceLevels.map((level) => (
                            <div key={level} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`level-${level}`}
                                    checked={filters.experienceLevel === level}
                                    onCheckedChange={(checked) => handleCheckboxChange("experienceLevel", checked ? level : null)}
                                />
                                <Label htmlFor={`level-${level}`} className="text-sm font-normal">
                                    {level}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Filters */}
            <div className="lg:hidden space-y-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            Category
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px]">
                        {categories.map((category) => (
                            <DropdownMenuItem
                                key={category}
                                className="flex items-center space-x-2"
                                onSelect={() => handleCheckboxChange("category", category)}
                            >
                                <Checkbox checked={filters.category === category} />
                                <span>{category}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            Location
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px]">
                        {locations.map((location) => (
                            <DropdownMenuItem
                                key={location}
                                className="flex items-center space-x-2"
                                onSelect={() => handleCheckboxChange("location", location)}
                            >
                                <Checkbox checked={filters.location === location} />
                                <span>{location}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            Experience Level
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px]">
                        {experienceLevels.map((level) => (
                            <DropdownMenuItem
                                key={level}
                                className="flex items-center space-x-2"
                                onSelect={() => handleCheckboxChange("experienceLevel", level)}
                            >
                                <Checkbox checked={filters.experienceLevel === level} />
                                <span>{level}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}