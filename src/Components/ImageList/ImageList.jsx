import React, {useRef}  from 'react';
import { useDrag, useDrop} from 'react-dnd';
import './ImageList.css';

// Need to pass which type of element can be draggable
// It's a simple string or Symbol. This is like a unique ID so 
// the library knows what type of element is dragged or dropped on
const type = 'Image'; 

//Rendering individual images
const Image = ({ image, index, moveImage }) => {
    // Initialize the reference
    const ref = useRef(null);
    // useDrop hook is responsible for handling whether any item gets hovered
    // or dropped on the element
    const[, drop] = useDrop({
        // Accept will make sure only these element types can be droppable on this element
        accept: type,
        hover(item) {
            if(!ref.current) {
                return;
            }
            const dragIndex = item.index;
            //current element where the dragged element is hovered on
            const hoverIndex = index;
            //If the dragged element is hovered in the same place, then do nothing
            if (dragIndex === hoverIndex) {
                return;
            }
            //If it is dragged around other elements, then move the image and set the state with position changes
            moveImage(dragIndex, hoverIndex);
            /*Update the index for dragged item directly to avoid flickering 
            when the image is half dragged into the next*/
            item.index=hoverIndex;            
        }
    });

    const [{isDragging}, drag] = useDrag({
        // item denotes the element type, unique identifier (id) and the index (position in List)
        item: {type, id: image.id, index},
        // collect method is like an event listener. It monitors whether the element is 
        // being dragged and exposes that information
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    // Initialize drag and drop into the element using its reference
    // Here we initialize both drag and drop on the same element, an Image
    drag(drop(ref));
    // can we do the following:
    // drag(ref)
    // drop(ref)

    return (
        <div className='file-item' 
            ref={ref} 
            style={{opacity: isDragging ? 0 : 1}}>
            <img alt={`img - ${image.id}`} src={image.src} className='file-img' />
        </div>
    );
};

//ImageList Component
const ImageList = ({ images }) => {

    //render each image by calling Image component
    const renderImage = (image, index) => {
        return (
            <Image 
                image = {image}
                key = {`${image.id}-image`}
            />
        );
    };

    //return the list of files
    return <section className='file-list'>{images.map(renderImage)}</section>
};

export default ImageList; 