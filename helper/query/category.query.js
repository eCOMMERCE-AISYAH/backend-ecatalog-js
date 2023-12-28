function create(name) {
  return {
    data: {
      name,
    },
    include: {
      subCategories: true,
    },
  };
}

function getAll(take, skip) {
  return {
    include: {
      subCategories: true,
    },
    take: take !== undefined ? Number(take) : undefined,
    skip: skip !== undefined ? Number(skip) : undefined,
  };
}

function getById(id) {
  return {
    where: {
      id,
    },
    include: {
      subCategories: true,
    },
  };
}

function update(id, name) {
  return {
    data: {
      name,
    },
    where: {
      id,
    },
    include: {
      subCategories: true,
    },
  };
}

function destroy(id) {
  return {
    where: {
      id,
    },
    include: {
      subCategories: true,
    },
  };
}

export default {
  create,
  getAll,
  getById,
  update,
  destroy,
};
