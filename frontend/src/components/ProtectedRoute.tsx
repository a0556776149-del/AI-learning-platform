import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  storageKey: string;
  redirectTo: string;
};

export default function ProtectedRoute({ children, storageKey, redirectTo }: Props) {
  const value = localStorage.getItem(storageKey);

  if (!value) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
}
