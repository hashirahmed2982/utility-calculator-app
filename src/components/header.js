export default function Header() {
    return (
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">🔢 Utility Hub</h1>
          <nav>
            <ul className="flex gap-6 text-lg">
              <li><a href="/loan" className="hover:underline">Loan</a></li>
              <li><a href="/bmi" className="hover:underline">BMI</a></li>
              <li><a href="/percentage" className="hover:underline">Percentage</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  