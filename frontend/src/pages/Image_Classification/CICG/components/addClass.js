import './class.css';

const AddClass = ({Classes , setClasses}) => {

    const handleClasses = () => {
        let index = 0;
        setClasses(Classes.filter((itemi) => index = itemi.id));
        setClasses([
            ...Classes, { id: (index + 1), name: ` class ${(index + 1).toString()} `, images_no: 0, images: [] }
        ]);
    }

    return (
        <div className="class">
            <div className="addClass" onClick={() => { handleClasses(); }} > + Add New Class </div>
        </div>
    );
}

export default AddClass;