export const load = (({ params }) => {
    console.log(params)
    return {
      address: params.address
    };
  })