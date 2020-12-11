export const modifyCreatedAt = (res) => ({
  ...res._doc,
  id: res._id,
  createdAt: new Date(res.createdAt).toISOString(),
});
