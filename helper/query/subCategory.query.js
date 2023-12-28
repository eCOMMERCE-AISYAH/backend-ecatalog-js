function create(name, categoryId) {
  return {
    data: {
      name,
      categoryId,
    },
    include: {
      category: true,
    },
  };
}

function getAll(take, skip) {
  return {
    include: {
      category: true,
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
      category: true,
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
      category: true,
    },
  };
}

function destroy(id) {
  return {
    where: {
      id,
    },
    include: {
      category: true,
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
