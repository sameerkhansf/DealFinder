import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireRestaurantOwner?: boolean;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
  requireRestaurantOwner = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, isRestaurantOwner, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requireRestaurantOwner && !isRestaurantOwner) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
