import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LevelSelector({levels, onValueChange}) {
  return (
    <Select onValueChange={(str:string) => console.log(str)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Level"/>
      </SelectTrigger>
      <SelectContent>
        {levels?.map((level, levelIndex) => (
          <SelectItem value={levelIndex}>{level.theme}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}