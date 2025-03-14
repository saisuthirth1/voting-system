"use client"

import { Fingerprint, Shield } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VerificationModeToggleProps {
  value: "standard" | "enhanced"
  onValueChange: (value: "standard" | "enhanced") => void
}

export function VerificationModeToggle({ value, onValueChange }: VerificationModeToggleProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <Fingerprint className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="verification-mode" className="text-muted-foreground">
                  Standard
                </Label>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Fingerprint verification only</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Switch
          id="verification-mode"
          checked={value === "enhanced"}
          onCheckedChange={(checked) => onValueChange(checked ? "enhanced" : "standard")}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="verification-mode" className="text-muted-foreground">
                  Enhanced
                </Label>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Fingerprint + Voice verification</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

