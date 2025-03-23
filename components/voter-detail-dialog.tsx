"use client"

import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface VoterDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  voter: {
    id: number
    name: string
    voterId: string
    verificationStatus: string
    verificationTime: string
    manualCheckReason?: string
    boothNumber: number
    aadhaarLastDigits: string
  } | null
}

export function VoterDetailDialog({ isOpen, onClose, voter }: VoterDetailDialogProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !voter) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Voter Details</DialogTitle>
          <DialogDescription>Verification information for {voter.name}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium">Name:</span>
            <span className="col-span-2">{voter.name}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium">Voter ID:</span>
            <span className="col-span-2">{voter.voterId}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium">Aadhaar:</span>
            <span className="col-span-2">XXXX-XXXX-{voter.aadhaarLastDigits}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium">Booth:</span>
            <span className="col-span-2">Booth #{voter.boothNumber}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium">Verification Time:</span>
            <span className="col-span-2">{new Date(voter.verificationTime).toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium">Status:</span>
            <span className="col-span-2">
              {voter.verificationStatus === "verified" ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>
              ) : (
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Manual Check</Badge>
              )}
            </span>
          </div>
          {voter.verificationStatus === "manual_check" && voter.manualCheckReason && (
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-sm font-medium">Reason:</span>
              <span className="col-span-2 text-red-600">{voter.manualCheckReason}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}