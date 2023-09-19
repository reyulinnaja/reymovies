export const mapDatasWithFavorite = (datas: any, favoriteDatas: any) => {
  return datas.map((data: any) => {
    if (favoriteDatas.includes(data.id)) {
      return {
        ...data,
        favorite: true,
      };
    }
    return data;
  });
};
