"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, User, MapPin, Phone, Loader } from "lucide-react";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Register() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<E164Number | undefined>();
  const [phoneError, setPhoneError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      if (phone && phone.length < 13) {
        setPhoneError("Numero de téléphone incorrect");
      } else {
        setPhoneError("");
        setIsLoading(true);
        const data = {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          district: formData.get("district"),
          phone: phone,
          photo: photo,
        };
        const response = await axios.post("/api/members", data);

        if (response.data) {
          toast.success("Merci de nous avoir rejoint!", {
            style: {
              background: "green",
              color: "white",
            },
          });
        }
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'inscription.", {
        style: {
          background: "red",
          color: "white",
        },
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhoto(base64String.split(",")[1]); // Store only the base64 data, without the data URL prefix
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 py-12 px-4">
      <motion.div
        className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-green-600 p-6 text-white">
          <h1 className="text-2xl font-semibold">
            Bienvenue sur le portail d'adhésion du Mouvement NAAFOREMEEN !
          </h1>
          <p className="text-green-100 text-sm mt-1">
            Rejoignez notre communauté aujourd'hui
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="p-6 space-y-4"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-1">
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700 flex items-center"
            >
              <User className="w-4 h-4 mr-2 text-green-600" />
              Prénom
            </Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="Votre prénom"
              required
              className="w-full px-4 py-5 border-gray-300 rounded-md shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700 flex items-center"
            >
              <User className="w-4 h-4 mr-2 text-green-600" />
              Nom
            </Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Votre nom"
              required
              className="w-full px-4 py-5 border-gray-300 rounded-md shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <Label
              htmlFor="district"
              className="text-sm font-medium text-gray-700 flex items-center"
            >
              <MapPin className="w-4 h-4 mr-2 text-green-600" />
              Quartier
            </Label>
            <Select name="district" required>
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
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700 flex items-center"
            >
              <Phone className="w-4 h-4 mr-2 text-green-600" />
              Téléphone
            </Label>
            <PhoneInput
              defaultCountry="SN"
              placeholder="+221"
              international
              withCountryCallingCode
              name="phone"
              value={phone as E164Number | undefined}
              onChange={setPhone}
              required
              className="py-2 px-4 input-phone w-full border border-gray-300 rounded-md shadow-none"
            />
            {phoneError && (
              <span className="text-sm text-red-600">{phoneError}</span>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <Label
              htmlFor="photo"
              className="text-sm font-medium text-gray-700"
            >
              Photo
            </Label>
            <div className="mt-1 flex items-center space-x-4">
              {photo ? (
                <img
                  src={`data:image/jpeg;base64,${photo}`}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <Input
                id="photo"
                type="file"
                accept="image/*"
                className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                onChange={handlePhotoChange}
                required
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
            >
              {isLoading ? <Loader className="animate-spin" /> : " S'inscrire"}
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}
