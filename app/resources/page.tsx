import Sources from '../components/Resources'
import Sidebar from '../components/Sidebar';

export default function Page() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Sources />
      </main>
    </div>
  );
}