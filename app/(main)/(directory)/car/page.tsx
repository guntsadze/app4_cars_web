import ProtectedRoute from "../../ProtectedRoute";
import { CarView } from "./CarView";

export default function RegionPage() {
  return <ProtectedRoute menuName="car" children={<CarView />} />;
}
