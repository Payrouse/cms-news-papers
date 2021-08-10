import Head from 'next/head';
import AppLayout from '../../components/layouts/AppLayout';

const Category = (props: any) => {
  const news = [
    {
      title: 'Laptos de nueva generacion',
      desc: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Neque, nulla quidem ducimus facilis ad fuga accusamus autem!
      Earum qui dolores, aperiam, rem natus nobis magni repellat
      minus tempore eaque dolore.`,
      date: 'Agosto 6',
      category: 'Tecnología',
      url_img:
        'https://i1.wp.com/hipertextual.com/wp-content/uploads/2021/02/apple_macos-bigsur-1.jpg',
    },
    {
      title: 'AMD Ryzen',
      desc: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Neque, nulla quidem ducimus facilis ad fuga accusamus autem!
      Earum qui dolores, aperiam, rem natus nobis magni repellat
      minus tempore eaque dolore.`,
      date: 'Agosto 7',
      category: 'Tecnología',
      url_img:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.XFsXiFSXMBqC1wHmyWlsqQHaEH%26pid%3DApi&f=1',
    },
  ];
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Diario El Mundo, donde encuentras las verdades más verdaderas de las verdades"
        />
      </Head>
      <AppLayout>
        <div className="mx-32">
          <h1 className="font-bold mb-4">Noticias Recientes de Tecnologia</h1>
          <div className="divide-y-2">
            {news.map((item) => {
              return (
                <div className="flex my-10 p-4 items-center cursor-pointer">
                  <div className="flex flex-col">
                    <div>
                      <h2 className="font-bold text-lg"> {item.title}</h2>
                      <p className="text-base"> {item.desc} </p>
                    </div>
                    <div className="flex text-sm mt-1">
                      <p>{item.date}</p>
                      <p className="ml-4 italic">{item.category}</p>
                    </div>
                  </div>
                  <img
                    className="ml-1 w-24 h-24 md:w-52 md:h-32 object-contain"
                    src={item.url_img}
                    alt="img"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default Category;
