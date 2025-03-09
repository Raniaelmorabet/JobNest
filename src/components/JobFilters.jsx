import React, { useState } from "react";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

// Experience levels (static)
const experienceLevels = ["Entry Level", "Mid Level", "Senior"];

export function JobFilters({ filters, onFilterChange, locations, categories }) {
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreLocations, setShowMoreLocations] = useState(false);

  // Handle checkbox changes
  const handleCheckboxChange = (filterType, value) => {
    console.log(`Filter Type: ${filterType}, Value: ${value}`); // Debugging
    onFilterChange({ ...filters, [filterType]: value });
  };
  

  // Function to render categories with "Show More" logic
  const renderCategories = () => {
    const visibleCategories = showMoreCategories ? categories : categories.slice(0, 3);
    return (
        <>
          {visibleCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                    id={`category-${category.id}`}
                    checked={filters.category === category.name}
                    onCheckedChange={(checked) =>
                        handleCheckboxChange("category", checked ? category.name : null)
                    }
                />
                <Label htmlFor={`category-${category.id}`} className="text-sm font-normal">
                  {category.name}
                </Label>
              </div>
          ))}
          {categories.length > 3 && (
              <Button
                  variant="link"
                  className="text-sm text-green-700 underline p-0"
                  onClick={() => setShowMoreCategories(!showMoreCategories)}
              >
                {showMoreCategories ? "Show Less" : "Show More"}
              </Button>
          )}
        </>
    );
  };

  // Function to render locations with "Show More" logic
  const renderLocations = () => {
    const visibleLocations = showMoreLocations ? locations : locations.slice(0, 3);
    return (
        <>
          {visibleLocations.map((location, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                    id={`location-${index}`}
                    checked={filters.location === location}
                    onCheckedChange={(checked) =>
                        handleCheckboxChange("location", checked ? location : null)
                    }
                />
                <Label htmlFor={`location-${index}`} className="text-sm font-normal">
                  {location}
                </Label>
              </div>
          ))}
          {locations.length > 3 && (
              <Button
                  variant="link"
                  className="text-sm text-green-700 underline p-0"
                  onClick={() => setShowMoreLocations(!showMoreLocations)}
              >
                {showMoreLocations ? "Show Less" : "Show More"}
              </Button>
          )}
        </>
    );
  };

  return (
      <>
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block space-y-8">
          {/* Category Filter */}
          <div>
            <h3 className="font-bold mb-4">Category</h3>
            <div className="space-y-5">{renderCategories()}</div>
          </div>

          {/* Location Filter */}
          <div>
            <h3 className="font-bold mb-4">Location</h3>
            <div className="space-y-5">{renderLocations()}</div>
          </div>

          {/* Experience Level Filter */}
          <div>
            <h3 className="font-bold mb-4">Experience Level</h3>
            <div className="space-y-5">
              {experienceLevels.map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox
                        id={`level-${level}`}
                        checked={filters.experienceLevel === level}
                        onCheckedChange={(checked) =>
                            handleCheckboxChange("experienceLevel", checked ? level : null)
                        }
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
          {/* Category Dropdown */}
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
                      key={category.id}
                      className="flex items-center space-x-2"
                      onSelect={() => handleCheckboxChange("category", category.name)}
                  >
                    <Checkbox checked={filters.category === category.name} />
                    <span>{category.name}</span>
                  </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Location Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                Location
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              {locations.map((location, index) => (
                  <DropdownMenuItem
                      key={index}
                      className="flex items-center space-x-2"
                      onSelect={() => handleCheckboxChange("location", location)}
                  >
                    <Checkbox checked={filters.location === location} />
                    <span>{location}</span>
                  </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Experience Level Dropdown */}
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
  );
}