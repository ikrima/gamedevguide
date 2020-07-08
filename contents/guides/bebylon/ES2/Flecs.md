<!-- markdownlint-disable -->

# Flecs

- Get Component from entity:

  ```cpp
  ecs_get_ptr(rows->world, components[i], EcsComponent);
  ```

- Shared components. Both e_1 and e_2 share Position from base:
  - On creation:

    ```cpp
    ecs_entity_t base = ecs_new(world, Position);
    ecs_entity_t e_1 = ecs_new_instance(world, base, Velocity);
    ecs_entity_t e_2 = ecs_new_instance(world, base, Velocity);
    ```

  - After entity creation:

    ```cpp
    ecs_entity_t e_3 = ecs_new(world, 0);
    ecs_inherit(world, e_3, base);
    ecs_disinherit(world, e_3, base);
    ```

- Iterate Through columns of table dynamically

  ```cpp
  void MySystem(ecs_rows_t *rows) {

      ecs_type_t table_type = ecs_table_type(rows);
      uint32_t column_count = ecs_vector_count(table_type);
      ecs_entity_t *components = ecs_vector_first(table_type);

      for (int i = 0; i < column_count; i ++) {
          const void *column_data = ecs_table_column(rows, i);
          EcsComponent *component = ecs_get_ptr(rows->world, components[i], EcsComponent);
          uint32_t element_size = component->size;
          uint32_t element_count = rows->count;

          // .. do whatever
      }
  }


  ecs_type_t table_type = ecs_get_table_type(rows);
  uint32_t column_count = ecs_vector_count(table_type);
  ecs_entity_t *components = ecs_vector_first(table_type);

  for (uint32_t i = 0; i < column_count; i ++) {
      ecs_vector_t *column = ecs_get_table_column(rows, i);
      uint32_t count = ecs_vector_count(column);
      void *buffer = ecs_vector_first(column);
      EcsComponent *comp = ecs_get_ptr(rows->world, components[i], EcsComponent);

      memcpy(<<dst>>, buffer, comp->size * count);
  }

  ecs_table_create(world, (ecs_entity_t[]){
          EcsPosition2D,
          EcsVelocity2D
      },
      entity_buffer,
      (void*[]){
          position_buffer,
          velocity_buffer
      });
  ```

- Template type registry

  ```cpp
  const ES2Bld::TypeInt velCompId = ES2Bld::TypeToIntGenerator<FES2VelocityComp>::GetTypeId();
  //constexpr auto id_of_int_type = type_id_t{ type_id<FES2VelocityComp>() };
  ES2Bld::TypeRegistery<FES2VelocityComp, FES2PositionComp, int> registered_types;
  constexpr auto test1 = ES2Bld::GetTypeIdFromRegistry<int>(registered_types);
  ```
