export const load = (({ params }) => {
    console.log(params)
    return {
      username: params.user
    };
  })