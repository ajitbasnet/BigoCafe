"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react"
import type {
  CustomizationGroup,
  CustomizationOption,
  SelectType,
} from "@/lib/mock-data/customization-options"
import { useAdminCustomizationStore } from "@/stores/admin-customization-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

function OptionRow({
  groupId,
  option,
  onEdit,
  onDelete,
  onSetDefault,
}: {
  groupId: string
  option: CustomizationOption
  onEdit: () => void
  onDelete: () => void
  onSetDefault: () => void
}) {
  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg bg-muted/50 border border-border">
      <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="font-medium text-foreground">{option.name}</span>
        <span className="text-muted-foreground text-sm ml-2">
          + Rs. {option.extraPrice}
        </span>
        {option.isDefault && (
          <span className="ml-2 text-xs text-primary">(default)</span>
        )}
      </div>
      {!option.isDefault && (
        <Button variant="ghost" size="sm" onClick={onSetDefault} className="text-xs">
          Set default
        </Button>
      )}
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit}>
        <Pencil className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive hover:text-destructive"
        onClick={onDelete}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}

export function CustomizationBuilder() {
  const groups = useAdminCustomizationStore((s) => s.groups)
  const addGroup = useAdminCustomizationStore((s) => s.addGroup)
  const updateGroup = useAdminCustomizationStore((s) => s.updateGroup)
  const removeGroup = useAdminCustomizationStore((s) => s.removeGroup)
  const addOption = useAdminCustomizationStore((s) => s.addOption)
  const updateOption = useAdminCustomizationStore((s) => s.updateOption)
  const removeOption = useAdminCustomizationStore((s) => s.removeOption)
  const setDefaultOption = useAdminCustomizationStore((s) => s.setDefaultOption)

  const [groupDialogOpen, setGroupDialogOpen] = useState(false)
  const [optionDialogOpen, setOptionDialogOpen] = useState(false)
  const [editingGroup, setEditingGroup] = useState<CustomizationGroup | null>(null)
  const [editingOption, setEditingOption] = useState<{
    groupId: string
    option: CustomizationOption
  } | null>(null)
  const [optionGroupId, setOptionGroupId] = useState<string | null>(null)
  const [deleteGroupTarget, setDeleteGroupTarget] = useState<CustomizationGroup | null>(null)
  const [deleteOptionTarget, setDeleteOptionTarget] = useState<{
    groupId: string
    option: CustomizationOption
  } | null>(null)

  const [newGroupLabel, setNewGroupLabel] = useState("")
  const [newGroupType, setNewGroupType] = useState<SelectType>("single")
  const [newOptionName, setNewOptionName] = useState("")
  const [newOptionPrice, setNewOptionPrice] = useState(0)
  const [newOptionDefault, setNewOptionDefault] = useState(false)

  const openAddGroup = () => {
    setEditingGroup(null)
    setNewGroupLabel("")
    setNewGroupType("single")
    setGroupDialogOpen(true)
  }

  const openEditGroup = (g: CustomizationGroup) => {
    setEditingGroup(g)
    setNewGroupLabel(g.label)
    setNewGroupType(g.type)
    setGroupDialogOpen(true)
  }

  const saveGroup = () => {
    if (!newGroupLabel.trim()) return
    if (editingGroup) {
      updateGroup(editingGroup.id, { label: newGroupLabel.trim(), type: newGroupType })
      toast.success("Group updated")
    } else {
      addGroup(newGroupLabel.trim(), newGroupType)
      toast.success("Group added")
    }
    setGroupDialogOpen(false)
  }

  const openAddOption = (groupId: string) => {
    setOptionGroupId(groupId)
    setEditingOption(null)
    setNewOptionName("")
    setNewOptionPrice(0)
    setNewOptionDefault(false)
    setOptionDialogOpen(true)
  }

  const openEditOption = (groupId: string, option: CustomizationOption) => {
    setOptionGroupId(groupId)
    setEditingOption({ groupId, option })
    setNewOptionName(option.name)
    setNewOptionPrice(option.extraPrice)
    setNewOptionDefault(option.isDefault)
    setOptionDialogOpen(true)
  }

  const saveOption = () => {
    if (!optionGroupId || !newOptionName.trim()) return
    if (editingOption) {
      updateOption(optionGroupId, editingOption.option.id, {
        name: newOptionName.trim(),
        extraPrice: newOptionPrice,
        isDefault: newOptionDefault,
      })
      toast.success("Option updated")
    } else {
      addOption(optionGroupId, {
        name: newOptionName.trim(),
        extraPrice: newOptionPrice,
        isDefault: newOptionDefault,
      })
      toast.success("Option added")
    }
    setOptionDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={openAddGroup} className="rounded-xl">
          <Plus className="w-4 h-4 mr-2" />
          Add option group
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-0.5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{group.label}</CardTitle>
                  <span className="text-xs text-muted-foreground rounded-full bg-muted px-2 py-0.5">
                    {group.type === "single" ? "Single select" : "Multi select"}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => openEditGroup(group)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => setDeleteGroupTarget(group)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {group.options.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4">No options yet.</p>
                ) : (
                  group.options.map((opt) => (
                    <OptionRow
                      key={opt.id}
                      groupId={group.id}
                      option={opt}
                      onEdit={() => openEditOption(group.id, opt)}
                      onDelete={() => setDeleteOptionTarget({ groupId: group.id, option: opt })}
                      onSetDefault={() => setDefaultOption(group.id, opt.id)}
                    />
                  ))
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-xl mt-2"
                  onClick={() => openAddOption(group.id)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add option
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit group dialog */}
      <Dialog open={groupDialogOpen} onOpenChange={setGroupDialogOpen}>
        <DialogContent className="rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle>{editingGroup ? "Edit group" : "New option group"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Label</Label>
              <Input
                value={newGroupLabel}
                onChange={(e) => setNewGroupLabel(e.target.value)}
                placeholder="e.g. Milk Type"
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label>Select type</Label>
              <Select
                value={newGroupType}
                onValueChange={(v) => setNewGroupType(v as SelectType)}
              >
                <SelectTrigger className="mt-1 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single select</SelectItem>
                  <SelectItem value="multi">Multi select</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGroupDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveGroup}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit option dialog */}
      <Dialog open={optionDialogOpen} onOpenChange={setOptionDialogOpen}>
        <DialogContent className="rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle>{editingOption ? "Edit option" : "New option"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Name</Label>
              <Input
                value={newOptionName}
                onChange={(e) => setNewOptionName(e.target.value)}
                placeholder="e.g. Oat Milk"
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label>Extra price (Rs.)</Label>
              <Input
                type="number"
                min={0}
                value={newOptionPrice}
                onChange={(e) => setNewOptionPrice(Number(e.target.value) || 0)}
                className="mt-1 rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="default-opt"
                checked={newOptionDefault}
                onChange={(e) => setNewOptionDefault(e.target.checked)}
              />
              <Label htmlFor="default-opt">Default option</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOptionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveOption}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteGroupTarget}
        onOpenChange={(open) => !open && setDeleteGroupTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete group</AlertDialogTitle>
            <AlertDialogDescription>
              Delete &quot;{deleteGroupTarget?.label}&quot; and all its options?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteGroupTarget) {
                  removeGroup(deleteGroupTarget.id)
                  toast.success("Group deleted")
                  setDeleteGroupTarget(null)
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={!!deleteOptionTarget}
        onOpenChange={(open) => !open && setDeleteOptionTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete option</AlertDialogTitle>
            <AlertDialogDescription>
              Delete &quot;{deleteOptionTarget?.option.name}&quot;?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteOptionTarget) {
                  removeOption(deleteOptionTarget.groupId, deleteOptionTarget.option.id)
                  toast.success("Option deleted")
                  setDeleteOptionTarget(null)
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
