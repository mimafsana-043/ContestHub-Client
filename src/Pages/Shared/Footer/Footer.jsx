import { FaFacebook, FaLinkedin } from "react-icons/fa";
const Footer = () => {
    return (
        <div className="bg-base-200 text-base-content mt-16">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Logo / Name */}
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold text-primary">
                            BattleOfBrains
                        </h2>
                        <p className="text-sm opacity-70 mt-1">
                            Where creativity meets competition
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-6 text-2xl">
                        <a
                            href="https://www.facebook.com/mim.afsana.5015"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary transition"
                        >
                            <FaFacebook />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/mim-afsana-63a647308?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary transition"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-base-300 my-6"></div>

                {/* Copyright */}
                <p className="text-center text-sm opacity-70">
                    © {new Date().getFullYear()} BattleOfBrains. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;