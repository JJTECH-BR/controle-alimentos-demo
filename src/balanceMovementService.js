export async function persistBalanceMovement({ supabase, product, form, userId, performedBy }) {
    const quantity = Number(form.quantity);
    if (!Number.isFinite(quantity) || quantity <= 0) return { error: 'Informe uma quantidade válida.' };

    const movement = {
        id: form.id || crypto.randomUUID(),
        date: form.date || new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        product: product.name,
        productId: product.id,
        type: form.type,
        quantity,
        user: performedBy || 'Autor não informado',
        note: form.note || '',
        supplier: form.supplier || product.supplier,
        unitValue: Number(form.unitValue || 0),
        totalValue: Number(form.totalValue || quantity * Number(form.unitValue || 0)),
        document: form.document || ''
    };

    if (supabase) {
        const row = {
            product_id: product.id,
            type: movement.type,
            quantity: movement.quantity,
            movement_date: movement.date,
            note: movement.note,
            unit_price: movement.unitValue,
            document_number: movement.document,
            user_id: userId || null,
            performed_by: movement.user
        };
        const request = form.id
            ? supabase.from('balance_movements').update(row).eq('id', form.id)
            : supabase.from('balance_movements').insert({ id: movement.id, ...row });
        const { error } = await request;
        if (error) return { error: error.message };
    }

    return { movement };
}

export async function deleteBalanceMovement({ supabase, movement }) {
    if (!supabase) return { error: null };
    const { error } = await supabase.from('balance_movements').delete().eq('id', movement.id);
    return { error: error?.message || null };
}
