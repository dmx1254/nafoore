"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  Users,
  PlusCircle,
  MapPin,
  MoreHorizontal,
  Trash2,
  Edit,
  FilePenLine,
  Trash,
  LogOut,
} from "lucide-react";
import axios from "axios";
import { MemberResponse } from "@/lib/types/member";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { EditMemberDialog } from "@/components/MemberUpdate";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const [members, setMembers] = useState<MemberResponse[]>([]);
  const [isMemberLoading, setIsMemberLoading] = useState<boolean>(true);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setIsMemberLoading(true);
      const response = await axios.get("/api/members");
      if (response.data.members) {
        setMembers(response.data.members);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      toast.success("Impossible de charger les membres", {
        style: {
          background: "green",
          color: "white",
        },
      });
    } finally {
      setIsMemberLoading(false);
    }
  };

  const handleDeleteMember = async () => {
    if (!memberToDelete) return;

    try {
      const response = await axios.post("/api/deleteMember", {
        userId: memberToDelete,
      });

      // Remove the deleted member from the local state
      if (response.data) {
        toast.success("Membre supprimé avec succès", {
          style: {
            background: "green",
            color: "white",
          },
        });
      }
      setMembers(members.filter((m) => m._id !== memberToDelete));
    } catch (error) {
      console.error("Error deleting member:", error);

      toast.error("Impossible de supprimer le membre", {
        style: {
          background: "red",
          color: "white",
        },
      });
    } finally {
      setMemberToDelete(null);
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Prénom",
      "Nom",
      "Quartier",
      "Téléphone",
      "Date d'inscription",
    ];
    const csvData = members?.map((member) => [
      member.firstName,
      member.lastName,
      member.district,
      member.phone,
      new Date(member.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "membres.csv";
    link.click();
  };

  const renderStatCard = (
    icon: React.ReactNode,
    title: string,
    value: number
  ) => (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-gray-300">
      <CardContent className="flex items-center p-6 space-x-4">
        <div className="bg-gray-50 p-3 rounded-full">{icon}</div>
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-green-800">{value}</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderSkeletonLoader = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, index) => (
          <Skeleton key={index} className="h-24 w-full" />
        ))}
      </div>
      <Skeleton className="h-[500px] w-full" />
    </div>
  );

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Tableau de Bord
        </h1>
        <Button
          variant="outline"
          className="border-gray-300 text-green-600 hover:bg-green-50"
          onClick={exportToCSV}
        >
          <Download className="mr-2 h-4 w-4" />
          Exporter en CSV
        </Button>
      </div>

      {isMemberLoading ? (
        renderSkeletonLoader()
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {renderStatCard(
              <Users className="text-green-500 h-6 w-6" />,
              "Total des Membres",
              members.length
            )}
            {renderStatCard(
              <PlusCircle className="text-teal-500 h-6 w-6" />,
              "Nouveaux Membres (7j)",
              members.filter(
                (m) =>
                  new Date(m.createdAt) >
                  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              ).length
            )}
            {renderStatCard(
              <MapPin className="text-purple-500 h-6 w-6" />,
              "Quartiers Représentés",
              new Set(members.map((m) => m.district)).size
            )}
          </div>
          <Card className="shadow-lg border-none">
            <Table>
              <TableHeader className="bg-green-50">
                <TableRow>
                  <TableHead className="w-[100px]">Photo</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Quartier</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow
                    key={member?._id}
                    className="hover:bg-green-50/50 transition-colors"
                  >
                    <TableCell>
                      <Image
                        width={60}
                        height={60}
                        src={`data:image/jpeg;base64,${member?.photo}`}
                        alt={`${member?.firstName} ${member?.lastName}`}
                        className="w-12 h-12 rounded-full object-cover border-2 border-green-100 shadow-sm"
                      />
                    </TableCell>
                    <TableCell>{member?.firstName}</TableCell>
                    <TableCell>{member?.lastName}</TableCell>
                    <TableCell>
                      <Badge className="bg-gray-50 text-green-600">
                        {member?.district}
                      </Badge>
                    </TableCell>
                    <TableCell>{member?.phone}</TableCell>
                    <TableCell>
                      <Badge className="bg-gray-50 text-green-600">
                        {new Date(member.createdAt).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-4">
                        <EditMemberDialog
                          member={member}
                          onUpdateSuccess={(updatedMember) => {
                            setMembers(
                              members.map((m) =>
                                m._id === updatedMember._id ? updatedMember : m
                              )
                            );
                          }}
                        />
                        <button
                          onClick={() => setMemberToDelete(member._id)}
                          className="flex items-center justify-center p-0.5 border rounded border-red-300 text-red-400 transition-all hover:text-red-700"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          {/* Delete Confirmation Dialog */}
          <AlertDialog
            open={!!memberToDelete}
            onOpenChange={() => setMemberToDelete(null)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Êtes-vous sûr de vouloir supprimer ce membre ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Le membre sera définitivement
                  supprimé de la base de données.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleDeleteMember}
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          F
        </>
      )}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 fixed bottom-8 right-8 z-50 shadow-md p-2 rounded bg-violet-600 text-white transition-colors hover:bg-violet-700"
      >
        <LogOut />
        {/* Deconnexion */}
      </button>
    </div>
  );
}