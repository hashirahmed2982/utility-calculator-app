import Header from '@/components/header';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-blue-100 text-gray-800">
      {/* Calculator & Search */}
      <section className="flex flex-col md:flex-row justify-center items-start gap-10 px-4 py-10 max-w-7xl mx-auto">
        {/* Search */}
        <div className="w-full md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Free Online Calculators</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 p-2 border rounded shadow-sm"
            />
            <button className="bg-blue-700 text-white px-4 rounded hover:bg-blue-800">Search</button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 pb-20 max-w-7xl mx-auto">
        <Category
          title="Financial Calculators"
          basePath="financial"
          links={[
            { name: 'Mortgage Calculator', href: 'mortgage' },
            { name: 'Loan Calculator', href: 'loan' },
            { name: 'Auto Loan Calculator', href: 'auto-loan' },
            { name: 'Interest Calculator', href: 'interest' },
            { name: 'Payment Calculator', href: 'payment' },
            { name: 'Finance Calculator', href: 'finance' },

          ]}
        />
        <Category
          title="Fitness & Health Calculators"
          basePath="fitness"
          links={[
            { name: 'BMI Calculator', href: 'bmi' },
            { name: 'Calorie Calculator', href: 'calorie' },
            { name: 'Body Fat Calculator', href: 'body-fat' },
            { name: 'BMR Calculator', href: 'bmr' },
            { name: 'Ideal Weight Calculator', href: 'ideal-weight' },
          ]}
        />
        <Category
          title="Math Calculators"
          basePath="math"
          links={[
            { name: 'Scientific Calculator', href: 'scientific' },
            { name: 'Fraction Calculator', href: 'fraction' },
            { name: 'Percentage Calculator', href: 'percentage' },
            { name: 'Random Number Generator', href: 'random' },
            { name: 'Standard Deviation Calculator', href: 'standard-deviation' },
          ]}
        />
        <Category
          title="Other Calculators"
          basePath="other"
          links={[
            { name: 'Age Calculator', href: 'age' },
            { name: 'Date Calculator', href: 'date' },
            { name: 'Time Calculator', href: 'time' },
            { name: 'Hours Calculator', href: 'hours' },
            { name: 'GPA Calculator', href: 'gpa' },
          ]}
        />
      </section>
    </main>
  );
}

function Category({ title, links, basePath }) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-full grayscale" />
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <ul className="text-blue-700 space-y-1 text-sm">
        {links.map((link, i) => (
          <li key={i}>
            <Link href={`/${link.href}`} className="hover:underline">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
