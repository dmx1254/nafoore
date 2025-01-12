"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilePenLine, Loader } from "lucide-react";
import axios from "axios";
import { MemberResponse } from "@/lib/types/member";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface EditMemberDialogProps {
  member: MemberResponse;
  onUpdateSuccess: (updatedMember: MemberResponse) => void;
}

export function EditMemberDialog({
  member,
  onUpdateSuccess,
}: EditMemberDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: member.firstName,
    lastName: member.lastName,
    district: member.district,
    phone: member.phone,
  });
  const [district, setDistrict] = useState<string>(member.district);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      const response = await axios.post("/api/updateMember", {
        userId: member._id,
        ...formData,
        district,
      });

      if (response.data) {
        toast.success("Membre mis à jour avec succès", {
          style: {
            background: "green",
            color: "white",
          },
        });
        onUpdateSuccess(response.data.memberUpdated);
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error updating member:", error);
      toast.error("Impossible de mettre à jour le membre", {
        style: {
          background: "red",
          color: "white",
        },
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="flex items-center justify-center p-0.5 border rounded border-orange-300 text-orange-400 transition-all hover:text-orange-500"
      >
        <FilePenLine size={18} />
      </button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-100">
          <DialogHeader className="mb-2">
            <DialogTitle>Modifier les informations du membre</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="firstName" className="text-right">
                Prénom
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="col-span-3 border-gray-300 shadow-none"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="lastName" className="text-right">
                Nom
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="col-span-3 border-gray-300 shadow-none"
              />
            </div>
            {/* <div className="flex flex-col items-start gap-4">
              <Label htmlFor="district" className="text-right">
                Quartier
              </Label>
              <Select
                name="district"
                defaultValue={district}
                value={district}
                onValueChange={(value) => setDistrict(value)}
              >
                <SelectTrigger className="w-full px-4 py-5 border-gray-300 rounded-md shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                  <SelectValue placeholder="Sélectionnez votre quartier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tivaoune">Tivaoune</SelectItem>
                  <SelectItem value="Brigal">Brigal</SelectItem>
                  <SelectItem value="sinthiane">Sinthiane</SelectItem>
                  <SelectItem value="Diabé">Diabé</SelectItem>
                  <SelectItem value="Dierry">Dierry</SelectItem>

                  <SelectItem value="Madina Fresbeh">Madina Fresbeh</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="phone" className="text-right">
                Téléphone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="col-span-3 border-gray-300 shadow-none"
              />
            </div>
            <DialogFooter>
              <Button type="submit">
                {isUpdating ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Enregistrer les modifications"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
