import react from 'react';

function Item(props) {
  const {
    classes,
    title,
    image
  } = props;

  return (
    <div className={`${classes}__Item`}>
      <img
        className={`${classes}__image`}
        {...image}
      />
      <h3 className={`${classes}__title`}>{title}</h3>
    </div>
  )
}

export default Item;