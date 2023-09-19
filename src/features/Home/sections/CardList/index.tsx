import { Card } from "@/components/common";
import type { CardProps, CardListProps } from "@/types";

interface CardListProps2 extends CardListProps {
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
}

const CardList = ({ data, addFavorite, removeFavorite }: CardListProps2) => {
  return (
    <section className="grid grid-cols-5 gap-x-4 gap-y-3">
      {data.map((item: CardProps) => (
        <Card
          key={item.id}
          addFavorite={() => addFavorite(item.id)}
          removeFavorite={() => {
            removeFavorite(item.id);
          }}
          {...item}
        />
      ))}
    </section>
  );
};

export default CardList;
