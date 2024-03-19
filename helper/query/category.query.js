function create(name, slug) {
  return {
    data: {
      name,
      slug,
    },
  };
}

function getAll(take, skip) {
  return {
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
      subCategory: true,
    },
  };
}

function getDetail(slug) {
  return {
    where: {
      slug,
    },
  };
}

function update(id, name, slug) {
  return {
    data: {
      name,
      slug,
    },
    where: {
      id,
    },
  };
}

function destroy(id) {
  return {
    where: {
      id,
    },
  };
}

export default {
  create,
  getAll,
  getDetail,
  update,
  destroy,
  getById,
};
