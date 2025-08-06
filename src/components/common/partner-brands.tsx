"use client";

import Image from "next/image";

interface PartnerBrandsProps {
  title: string;
}

const PartnerBrands = ({ title }: PartnerBrandsProps) => {
  const brands = [
    { icon: "/nike.svg", name: "Nike" },
    { icon: "/adidas.svg", name: "Adidas" },
    { icon: "/puma.svg", name: "Puma" },
    { icon: "/newBalance.svg", name: "New Balance" },
    { icon: "/converse.svg", name: "Converse" },
    { icon: "/polo.svg", name: "Polo" },
    { icon: "/zara.svg", name: "Zara" },
  ];

  const infiniteBrands = [...brands, ...brands]; // duplicar para loop

  return (
    <div className="space-y-6 overflow-hidden">
      <h3 className="font-semibold">{title}</h3>

      <div className="relative w-full overflow-hidden">
        <div className="animate-scroll flex w-max gap-6">
          {infiniteBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex min-w-[135px] shrink-0 flex-col items-center"
            >
              <div className="flex h-[173px] w-[155px] items-center justify-center rounded-md border border-[#F1F1F1] bg-white">
                <Image
                  src={brand.icon}
                  alt={brand.name}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <span className="mt-2 text-center text-lg font-medium">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerBrands;
