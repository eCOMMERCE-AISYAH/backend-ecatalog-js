function create(name, slug, categoryId) {
  return {
    data: {
      name,
      slug,
      categoryId,
    },
    include: {
      category: true,
    },
  };
}

function getAll(take, skip) {
  return {
    take: take !== undefined ? Number(take) : undefined,
    skip: skip !== undefined ? Number(skip) : undefined,
    include: {
      category: true,
    },
  };
}

function getDetail(slug) {
  return {
    where: {
      slug,
    },
    include: {
      category: true,
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
  getDetail,
  update,
  destroy,
};
