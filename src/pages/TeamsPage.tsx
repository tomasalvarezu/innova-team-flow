import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Users, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import TeamNotificationsList from "@/components/TeamNotificationsList";
import TeamMembersList from "@/components/TeamMembersList";
import NotificationPermissionsDialog from "@/components/NotificationPermissionsDialog";

// Mock data - en producción vendría de la API
const mockTeam = {
  id: "team-1",
  name: "CodeFactory Sprint 1",
};

export default function TeamsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if current user is admin
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setIsAdmin(userRole === "admin");
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background-light">
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        onMobileToggle={toggleMobileSidebar}
      />
      
      <main className="flex-1 p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Equipos</h1>
          </div>
          
          {/* Settings button - solo visible para admins */}
          {isAdmin && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPermissionsDialogOpen(true)}
              className="rounded-lg hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
              aria-label="Configuración de permisos de notificaciones"
            >
              <Settings className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="integrantes">Integrantes</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <TeamNotificationsList teamId={mockTeam.id} isAdmin={isAdmin} />
          </TabsContent>

          <TabsContent value="integrantes">
            <TeamMembersList teamId={mockTeam.id} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Dialog de permisos */}
      <NotificationPermissionsDialog 
        open={isPermissionsDialogOpen}
        onOpenChange={setIsPermissionsDialogOpen}
        teamId={mockTeam.id}
      />
    </div>
  );
}