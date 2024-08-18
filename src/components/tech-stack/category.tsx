import { IconType } from "react-icons";

type CategoryProps = {
    showCategory: boolean;
    title: string;
    iconList: IconType[];
};

export default function Category({ showCategory, title, iconList}: CategoryProps) {
    return (
        <div className={`fade ${showCategory ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-4xl font-bold text-center p-10">{title}</h2> 
            <div className="flex justify-center flex-row space-x-10">
                {iconList.map((Icon, index) => (
                    <Icon key={index} size="80"/>
                ))}
            </div>
        </div>
    )
}