import { Card } from "@/components/common";
import type { CardProps, CardListProps } from "@/types";

const CardList = ({ data }: CardListProps) => {
  return (
    <section className="grid grid-cols-5 gap-x-4 gap-y-3">
      {data.map((item: CardProps) => (
        <Card
          key={item.id}
          href={item.title ? `/movies/${item.id}` : `/tvseries/${item.id}`}
          {...item}
        />
      ))}
    </section>
  );
};

export default CardList;
