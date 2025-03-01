import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  items: any[];
}

interface CategorySelectorProps {
  categories: Category[];
  onSelect: (id: string) => void;
}

export function CategorySelector({
  categories,
  onSelect,
}: CategorySelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select a Challenge Category</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="transition-all cursor-pointer hover:shadow-md"
            onClick={() => onSelect(category.id)}
          >
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
                {category.icon}
              </div>
              <h3 className="mb-2 text-lg font-medium">{category.name}</h3>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
