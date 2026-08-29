"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactional = Transactional;
const type_orm_unit_of_works1_1 = require("../unit-of-work/type-orm-unit-of-works1");
function Transactional() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            if (!this.dataSource) {
                throw new Error('dataSource no definido en el servicio');
            }
            const uow = new type_orm_unit_of_works1_1.TypeOrmUnitOfWork(this.dataSource);
            this.uow = uow;
            await uow.start();
            try {
                const result = await originalMethod.apply(this, args);
                await uow.commit();
                return result;
            }
            catch (error) {
                await uow.rollback();
                throw error;
            }
            finally {
                await uow.release();
                this.uow = null;
            }
        };
        return descriptor;
    };
}
//# sourceMappingURL=transactional.decoratos.js.map