using Billing.Db;
using Billing.Db.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Billing.Controllers
{
    public class CRUDController<TEntity> : AppController where TEntity : class
    {
        public CRUDController(DatabaseContext db) : base(db)
        {
        }


        protected virtual Task<TEntity?> BeforeSaveAsync(TEntity entity, bool isNew, CancellationToken cancellationToken = default) { return Task.FromResult((TEntity?)entity); }
        protected virtual Task<TEntity?> AfterSaveAsync(TEntity entity, bool isNew, CancellationToken cancellationToken = default) { return Task.FromResult((TEntity?)entity); }

        protected virtual IQueryable<TEntity> GetQuery()
        {
            return Db.Set<TEntity>();
        }

        [HttpGet]
        public virtual async Task<ICollection<TEntity>> GetAsync(CancellationToken cancellationToken = default)
        {
            return await GetQuery().ToArrayAsync(cancellationToken);
        }

        [HttpGet("{id}")]
        public virtual async Task<TEntity?> GetByIdAsync([FromRoute] int id, CancellationToken cancellationToken = default)
        {
            var res = await Db.Set<TEntity>().FindAsync(id, cancellationToken);
            return res;
        }

        [HttpPost]
        public virtual async Task<TEntity?> AddAsync([FromBody] TEntity? entity, CancellationToken cancellationToken = default)
        {
            if (entity != null)
            {
                entity = await BeforeSaveAsync(entity, true, cancellationToken);
            }
            if (entity != null)
            {
                Db.Entry(entity).State = EntityState.Added;
                await Db.SaveChangesAsync(cancellationToken);
                entity = await AfterSaveAsync(entity, true, cancellationToken);
            }
            return entity;
        }

        [HttpPut]
        public virtual async Task<TEntity?> EditAsync([FromBody] TEntity? entity, CancellationToken cancellationToken = default)
        {
            if (entity != null)
            {
                entity = await BeforeSaveAsync(entity, false, cancellationToken);
            }
            if (entity != null)
            {
                Db.Entry(entity).State = EntityState.Modified;
                await Db.SaveChangesAsync(cancellationToken);
                entity = await AfterSaveAsync(entity, false, cancellationToken);
            }
            return entity;
        }

        [HttpDelete("{id}")]
        public virtual async Task DeleteByIdAsync([FromRoute] int id, CancellationToken cancellationToken = default)
        {
            var entity = await Db.Set<TEntity>().FindAsync(id, cancellationToken);
            if (entity != null)
            {
                Db.Set<TEntity>().Remove(entity);
                await Db.SaveChangesAsync(cancellationToken);
            }
        }


    }
}
