
function Error (response) {
    response = response['name']

    return (
    
        <div className="error">
            {response}
        </div>
    
    );

}


export default Error;