export const load = (({ params }) => {
    console.log(params)
    return {
      pass_id: params.id
    };
  })