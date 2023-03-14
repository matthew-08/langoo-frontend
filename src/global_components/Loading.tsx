import React from 'react'
import { Grid } from 'react-loader-spinner'

const Loading = () => {
    return (
        <Grid
            height="80"
            width="80"
            color="#90cdf4"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    )
}

export default Loading
