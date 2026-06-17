import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {

    const number = "923001234567"; // replace with your real number

    return (
        <a
            href={`https://wa.me/${number}?text=Hello%20Embed%20AIOT`}
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg hover:scale-110 transition z-50"
        >
            <FaWhatsapp size={24} />
        </a>
    );
}