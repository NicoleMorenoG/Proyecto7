export default function Footer() {
    return (
    <footer className="mt-16 border-t">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Nicole Koi Joyas — hecho con amor ✨</p>
        <p className="opacity-75">Plata 925 • Piedras naturales • Diseño consciente</p>
        </div>
    </footer>
    );
}
