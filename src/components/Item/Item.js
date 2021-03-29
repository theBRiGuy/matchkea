function Item(props) {
  const baseCls = `${props.baseCls}__Item`;
  const { title, image } = props;

  return (
    <div className={baseCls}>
      <img className={`${baseCls}__image`} {...image} />
      <h3 className={`${baseCls}__title`}>{title}</h3>
    </div>
  );
}

export default Item;
