import Link from "next/link";

interface ExampleCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

export default function ExampleCard({
  title,
  description,
  href,
  icon,
}: ExampleCardProps) {
  return (
    <Link href={href}>
      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full bg-white">
        {icon && <div className="mb-4 text-blue-600">{icon}</div>}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="mt-4 text-blue-600 text-sm font-medium">
          Try it →
        </div>
      </div>
    </Link>
  );
}
