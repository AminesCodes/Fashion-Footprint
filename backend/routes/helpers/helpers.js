const checkValidId = (response, id) => {
    if (isNaN(parseInt(id)) || id+'' !== parseInt(id)+'') {
        response.status(403).send({
            error: true,
            message: 'Missing information',
            payload: null,
        })
        return false
    }
    return true
}

const checkValidParams = (response, param) => {
    if (!param) {
        response.status(403).send({
            error: true,
            message: 'Missing information',
            payload: null,
        })
        return false
    }
    return true
}

const handleErrors = (response, err) => {
    console.log('ERROR: - ', err)
    if (err.code === "23505" && err.detail.includes("already exists")) {
        console.log('Attempt to register a new user/brand with a taken email')
        response.status(403).json({
          error: true,
          message: 'email already registered',
          payload: null,
        }) 
    } else if (err.message === 'No data returned from the query.') {
        console.log('No match for the selection')
        response.status(404).json({
          error: true,
          message: 'No match for the selection',
          payload: null,
        }) 
    } else if (err.code === '23503') {
        response.status(403).json({
          error: true,
          message: 'Reference error!',
          payload: null,
        }) 
    } else {
        response.status(500).json({
          error: true,
          message: 'Sorry, something went wrong (D-B)',
          payload: null
        })
    }
}

module.exports = {
    checkValidId,
    checkValidParams,
    handleErrors,
}