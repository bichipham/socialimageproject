import Image from "next/image";

const RightPanel = () => {
  return (
    <aside className="col-span-3 hidden lg:block">
      <div className="sticky top-20 space-y-4">
        <div className="bg-white rounded-lg shadow p-2 flex">
          <Image
            src="https://picsum.photos/300/200?random=1"
            alt="Ad 1"
            className="rounded-md"
            width={300}
            height={200}
          />
          <p className="text-base pl-2 mt-2 text-gray-500">Advertisement #1</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">Contacts: ptbich308@gmail.com</div>
      </div>
    </aside>
  );
};

export default RightPanel;
